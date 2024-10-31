import { Spinner } from "@nextui-org/react";

interface LoadingProps {
  visible: boolean;
  className?: string;
}

export const Loading = (props: LoadingProps) => {
  const { visible, className } = props;

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full z-10 items-center justify-center flex backdrop-blur-sm${
        className ? " " + className : ""
      }`}
    >
      <Spinner size="lg" />
    </div>
  );
};
