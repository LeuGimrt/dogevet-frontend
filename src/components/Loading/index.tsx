import React from "react";
import { Spinner } from "../../elements/Spinner";
import { LoadingContainer } from "./styles";

type Props = {
  color?: "primary" | "secondary" | "dark";
  size?: "sm" | "md" | "lg";
  fullwidth?: boolean;
  fullheight?: boolean;
};

const Loading = ({
  size = "md",
  color = "dark",
  fullwidth = false,
  fullheight = false,
}: Props) => {
  return (
    <LoadingContainer fullheight={fullheight} fullwidth={fullwidth}>
      <Spinner size={size} color={color} />
    </LoadingContainer>
  );
};

export default Loading;
