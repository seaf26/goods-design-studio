import { useRef, type ElementType, type HTMLAttributes, type Ref } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type BlurTextElement = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span" | "blockquote";

type BlurTextProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  as?: BlurTextElement;
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  direction?: "top" | "bottom";
  animateBy?: "words" | "letters";
  once?: boolean;
  paintStrategy?: "reveal" | "lcp";
};

type BlurTextComponent = ElementType<
  HTMLAttributes<HTMLElement> & {
    ref?: Ref<HTMLElement>;
  }
>;

export function BlurText({
  as: Tag = "div",
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  duration = 0.82,
  direction = "bottom",
  animateBy = "words",
  once = true,
  paintStrategy = "reveal",
  ...props
}: BlurTextProps) {
  const Component = Tag as BlurTextComponent;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const units = animateBy === "letters" ? Array.from(text) : text.split(" ");
  const offset = direction === "top" ? -18 : 18;
  const isLcpSafe = paintStrategy === "lcp";
  const pendingState = isLcpSafe
    ? { y: offset * 0.5 }
    : { opacity: 0, filter: "blur(10px)", y: offset };
  const visibleState = isLcpSafe ? { y: 0 } : { opacity: 1, filter: "blur(0px)", y: 0 };

  return (
    <Component ref={ref} className={className} aria-label={text} {...props}>
      {units.map((unit, index) => {
        const content = animateBy === "words" && index < units.length - 1 ? `${unit} ` : unit;

        return (
          <span
            key={`${unit}-${index}`}
            aria-hidden
            className="inline-block overflow-hidden align-top"
          >
            <motion.span
              className={`inline-block whitespace-pre ${
                isLcpSafe ? "will-change-transform" : "will-change-[transform,filter,opacity]"
              }`}
              initial={shouldReduceMotion ? false : pendingState}
              animate={shouldReduceMotion || inView ? visibleState : pendingState}
              transition={{
                duration: shouldReduceMotion ? 0 : isLcpSafe ? Math.min(duration, 0.58) : duration,
                delay: shouldReduceMotion ? 0 : delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {content}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}
