import { extendTheme } from "@chakra-ui/react";

const config = {
  defaultColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: "Montserrat",
  body: "Source Sans Pro",
};

const colors = {
  primary: "#4c4ed7",
  secondary: "#ff90e8",
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
  colors,
  components: {
    Button: {
      baseStyle: {
        rounded: "sm",
      },
      variants: {
        primary: {
          bg: "#4c4ed7",
          color: "white",
        },
        secondary: {
          bg: "#ff90e8",
        },
      },
    },
  },
});

export default theme;
