import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getIsLogged } from "../../store/selectors";
import { Router } from "next/router";

const WithAuth = (WrappedComponent) => {


  return function Render(props) {

    const Router = useRouter();
    const isLogged = useSelector(getIsLogged);

    if (typeof window !== "undefined") {
      if (!isLogged) {
        Router.replace("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default WithAuth;