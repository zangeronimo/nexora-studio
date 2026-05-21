declare module '*.module.scss' {
  const content: {
    readonly [className: string]: string;
  };

  export = content;
}

declare module '*.scss';
