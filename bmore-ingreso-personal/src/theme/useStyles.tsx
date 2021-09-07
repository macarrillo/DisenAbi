import { makeStyles } from "@material-ui/core";
import theme from "./Theme";

const useStyles = makeStyles({
    card:{
        padding: 30
    },
    avatar: {
        backgroundColor:"#0f80aab",
        width:80,
        height:80
    },
    appBar :{
        paddingTop:8,
        paddingBottom: 8,
    },
    grow : {
        flexGrow : 1
    },
    linkAppBarLogo : {
        display : "inline-flex",
        alignItems : "center",
        color: "inherit",
        textDecoration: "none"
    },
    mr : {
        marginRight : 3 
    },
    buttonIcon : {
        fontSize:14,
        padding : 0
    },
    linkAppBarDesktop :{
        display: "inline-flex",
        alignItems:"center",
        padding:"6px 16px",
        color: "inherit",
        textDecoration: "none"
    },
    form : {
        marginTop: 40,
        marginBottom: 10
    },
    gridmb : {
        marginBottom: 20
    },
    link : {
        marginTop: 8,
        fontSize:"1.1rem",
        fontFamily:"Roboto",
        lineHeight: 1.5,
        color: theme.palette.primary.main,
        textDecoration: "none"
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 900,
    },
    containermt: {
        marginTop: 30
    }

})

export default useStyles;