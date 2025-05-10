import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `CodeinAja | ${title}`;
  }, [title]);
};

export default usePageTitle;