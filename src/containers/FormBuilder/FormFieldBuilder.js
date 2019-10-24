
import FormFieldFactory from './FormFieldFactory';
import FormLayoutFactory from './FormLayoutFactory';


const FormFieldBuilder = props => {

    const createItems = (items) => {
        if (!items) return null
        return items.map((config, index) => {
            if (config.items) {
                const children = createItems(config.items)
                return FormLayoutFactory.getLayout(config, index, children)
            } else {
                return FormFieldFactory.getField(config, props.changeHandler, index, props.data)
            }
        })
    }

    return (
        createItems(props.config.sections, props.data)
    );
};

FormFieldBuilder.propTypes = {

};

export default FormFieldBuilder;