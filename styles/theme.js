import { extendTheme } from "@chakra-ui/react";

const config = {
  defaultColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: "Montserrat",
  body: "Source Sans Pro",
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth",
        backgroundColor: "white",
      },
      "&::-webkit-scrollbar": {
        width: "1",
        borderRadius: "8px",
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "black",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "whitesmoke",
      },
    },
  },
  config,
  fonts,
});

export default theme;
