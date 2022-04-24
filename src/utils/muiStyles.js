import { makeStyles } from '@mui/styles';

const styles = (theme) => {
  return {
    toolBar: {
      height: '10vh',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: 'white',
    },
    logo: {
      color: "#041562",
      cursor: 'pointer',
    },
    inputField: {
      marginBottom: '20px !important',
      width: "100%"
    },
    link: {
      color: "#000",
      cursor: "pointer"
    },
    menuIcon: {
      color: '#000',
    },
    heroContainer: {
      width: "100%", 
      minHeight: "80vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      textAlign: "center"
    },
    heroText: {
      marginBottom: "20px !important", 
      fontWeight: "bolder", 
      color: "#041562"
    },
    heroSubtitle: {
      marginBottom: "30px !important", 
      color: "#11468F", 
      opacity: "0.8"
    }, 
    authGridContainer: {
      width: "100%", 
      height: "100%"
    }, 
    authGridImage: {
      backgroundColor: "#11468F", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh", 
      padding:"5px",
      [theme.breakpoints.between('xs', 'md')]: {
        display: "none"
      }
    }, 
    authSvg: {
      width: "100%"
    },
    authForm: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column !important",
    },
    authFormContainer: { 
      padding: "10px 15px 0px 15px",
    [theme.breakpoints.between('xs', 'sm')]: {
      padding: "10px 15px 0px 15px",
    }}
  };
};

const useStyles = makeStyles(styles);
export default useStyles;