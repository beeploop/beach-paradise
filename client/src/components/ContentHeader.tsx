type TProps = {
    text: string;
};

const ContentHeader = ({ text }: TProps) => {
    return (
        <header
            className="content-header"
            style={styles}
        >
            <h1>{text}</h1>
        </header>
    );
};

const styles = {
    marginTop: '0.5em',
    borderBottom: '1px solid slategray',
};

export default ContentHeader;
