import { motion, MotionProps } from 'framer-motion';

interface SplitTextProps extends MotionProps {
  children: string;
}

export function SplitText({ children, ...rest }: SplitTextProps) {
  const words = children.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <div
          key={`${children}-${i}`}
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <motion.div
            {...rest}
            style={{ display: 'inline-block', willChange: 'transform' }}
            custom={i}
          >
            {word + (i !== words.length - 1 ? '\u00A0' : '')}
          </motion.div>
        </div>
      ))}
    </>
  );
}
