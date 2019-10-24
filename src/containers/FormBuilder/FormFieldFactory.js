import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const getField = (config, changeHandler, key, data) => {
    switch (config.type) {
        case "textInput":// Fall through to default
        default:
            return createTextField(config, changeHandler, key, data);
    }

}

const createTextField = (fieldConfig, changeHandler, key, data) => {

    const classes = useStyles();
    return (
        <TextField
            className={classes.textField}
            key={fieldConfig.id}
            id={fieldConfig.id}
            label={fieldConfig.label}
            value={data && data[fieldConfig.id] ? data[fieldConfig.id] : ""}
            required={fieldConfig.required}
            disabled={fieldConfig.disabled}
            helperText={fieldConfig.helperText || ""}
            placeholder={fieldConfig.placeholder || ""}
            onChange={(event) => changeHandler(event, fieldConfig.id)}

            margin="normal"
            InputProps={{
                readOnly: fieldConfig.readOnly,
            }}
        />
    );
};

const FormFieldFactory = {
    getField: getField
}

export default FormFieldFactory;