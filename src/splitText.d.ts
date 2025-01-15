

declare module "../lib/Split3.min.js" {
    export default class SplitText {
      constructor(selector: string, options: { type: string });
      chars: HTMLElement[];
      words: HTMLElement[];
      lines: HTMLElement[];
      isSplit: boolean;
      revert(): void;
    }
  }
  