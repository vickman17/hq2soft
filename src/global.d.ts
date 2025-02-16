export {};

declare module "*.module.css";

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      customStyle?: (style: { bottom: string }) => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };
  }
}
