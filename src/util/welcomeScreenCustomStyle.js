export const customWelcomeScreenStyles = () => ({
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
        fontFamily: "sans-serif",
        textAlign: "center",
    },
    media: {
        paddingTop: "56.25%",
    },
    content: {
        textAlign: "left",
        padding: "1%",
    },
    divider: {
        margin: "1%",
    },
    heading: {
        fontWeight: "bold",
    },
    subheading: {
        lineHeight: 4,
    },
});