import Loading from "../components/Loading";
import { SectionContainer } from "../containers/SectionContainer";
import { H3 } from "../elements/Heading";

type Props = {
  title?: string;
};

const LoadingPage = ({ title }: Props) => {
  return (
    <SectionContainer
      flex
      fullheight
      flexDirection='column'
      alignItems='center'
      py={3}
    >
      {title && <H3>{title}</H3>}
      <Loading fullheight fullwidth />
    </SectionContainer>
  );
};

export default LoadingPage;
