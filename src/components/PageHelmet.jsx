import { Helmet } from "react-helmet-async";

const PageHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{`CodeinAja | ${title}`}</title>
    </Helmet>
  );
};

export default PageHelmet;
