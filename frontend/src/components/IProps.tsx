interface IProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  name?: string;
  imageLink?: string;
  darkMode?: boolean;
  onClick?: () => void;
  mischellaneous?: boolean;
  OverrideDarkmode?: boolean;
  themeChanger?: () => void;
}

export default IProps;
