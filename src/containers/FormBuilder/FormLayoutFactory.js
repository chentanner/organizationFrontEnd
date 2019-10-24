import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

import DynamicTabs from '../../components/DynamicTabs/DynamicTabs'


const useStyles = makeStyles(theme => ({
    formGroup: {
        padding: theme.spacing(1),
    },
}));

const createDynamicTabs = (dynamicTabsConfig, index, children) => {
    return (
        <DynamicTabs
            key={index}
            config={dynamicTabsConfig}
        >
            {dynamicTabsConfig.items.map((item, itemIndex) => {
                createDynamicTabPanel(item, itemIndex, children[itemIndex])
            })}
        </DynamicTabs>
    );
}

const createDynamicTabPanel = (dynamicTabConfig, index, children) => {

    return <Paper
        role="tabpanel"
        // hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
    // {...other}
    >
        {children}
    </Paper>
}

const createSection = (sectionConfig, index, children) => {
    const classes = useStyles();

    return (
        <FormControl key={index} className={classes.formGroup}>
            <FormGroup >
                {sectionConfig.title ? <FormLabel component="legend">{sectionConfig.title}</FormLabel> : null}
                {children}
            </FormGroup>
        </FormControl>
    );
}

const getLayout = (layoutConfig, index, children) => {
    switch (layoutConfig.type) {
        case "dynamicTabs":
            return createDynamicTabs(layoutConfig, index, children)
        case "section":// Fall through to default
        default:
            return createSection(layoutConfig, index, children);
    }
}

const FormLayoutFactory = {
    getLayout: getLayout
}

export default FormLayoutFactory;