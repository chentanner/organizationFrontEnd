import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import baseAxios from '../../axios-data';
import axios from '../../axios-data';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    label: {
        padding: theme.spacing(1, 1),
        display: "inline-block",
        width: "100px"
    }
}));

export default function DetailPaper(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [hasError, setErrors] = useState(false);
    const [details, setDetails] = useState(null);

    const detailConfig = props.detailConfig || testConfig;
    const detailData = details;



    useEffect(() => {
        if (props.selectedKey && (details === null || details.ID !== props.selectedKey)) {
            let url = props.url + "/" + props.selectedKey

            const promise = props.urlBase ? baseAxios.get(props.urlBase + url) : axios.get(url)
            promise
                .then(result => {
                    setDetails(result.data)
                })
                .catch(error => {
                    setErrors(error);
                });
        }
    });

    const generateTitle = (meta, selectedItemName) => {
        let name = selectedItemName === 0 || selectedItemName ? selectedItemName : meta.title;
        if (detailData)
            name = detailData[meta.titleIdRef] ? detailData[meta.titleIdRef] : name;
        return <h2 key="title">Detail: {name}</h2>
    }

    const generateSections = (sectionsMeta) => {
        const sections = sectionsMeta.reduce((previous, section, index) => {
            previous.push((<Divider key={"Divider_" + index} />));

            const items = section.items.map((item) => {
                return generateItemLine(item, detailData);
            });
            previous.push(items);
            return previous;
        }, []);

        return sections;
    };

    const generateItemLine = (itemMeta, dataItem) => {
        const label = itemMeta.label;
        return (
            <div key={itemMeta.id}>
                <label className={classes.label}>{label}: </label>
                <strong>{dataItem ? dataItem[itemMeta.id] : null}</strong>
            </div>
        );
    };

    return (
        <Paper className={classes.paper}>
            {generateTitle(detailConfig, props.selectedKey)}
            {generateSections(detailConfig.sections)}
        </Paper>
    );
};
