import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ResponsiveAppBar from "./component/appbar";
import SimpleBottomNavigation from "./component/nav";
import { Box } from "@mui/material";

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <SimpleBottomNavigation></SimpleBottomNavigation>
      <Box className="mainscreen" sx={{ pt: 5, pb: 5 }}>
        {content}
      </Box>
    </>
  );
};

export default App;
