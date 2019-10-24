import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../../components/CustomTable/CustomTable';
import RestfulTable from '../../components/RestfulTable/RestfulTable'
import ObjectSummary from '../ObjectSummary/ObjectSummary';
import DetailPaper from '../../components/DetailPaper/DetailPaper';
import * as objectManagerActions from '../../store/actions/index';


const useStyles = makeStyles(theme => ({

    summaryTable: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const SummaryTable = (props) => {
    const classes = useStyles();

    const [summaryOpen, setSummaryOpen] = useState(false);
    const [summaryDetail, setSummaryDetail] = useState({
        id: null,
        url: props.config.url || props.url,
        urlParams: props.config.params || "",
        tokenMap: {
            id: null
        }
    });

    function deleteButtonHandler() {

    };

    const openSummary = (key) => {
        setSummaryOpen(true);
        setSummaryDetail({ ...summaryDetail, tokenMap: { ...summaryDetail.tokenMap, id: key }, id: key });

    };

    const closeSummary = () => {

        setSummaryOpen(false);
        setSummaryDetail({ ...summaryDetail, tokenMap: { ...summaryDetail.tokenMap, id: null }, id: null });
    };

    function closeSummaryHandler() {
        closeSummary();
    };

    function openSummaryHandler(event, key) {
        if (key === summaryDetail.id) {
            // Close the summary
            closeSummary();
        } else {
            openSummary(key);
        }
    };

    const openItemHandler = (event, key) => {
        const urlPieces = props.router.asPath.split('/');
        urlPieces.push(key);
        props.onOpenItem(key, urlPieces.join('/'));
        // Router.pushRoute(urlPieces.join('/'));
    };

    function resolveUrl() {
        return Object.keys(summaryDetail.tokenMap).reduce((previous, key) => {
            if (previous === null || summaryDetail.tokenMap[key] === null) return null
            return previous.replace("{" + key + "}", summaryDetail.tokenMap[key]);
        }, summaryDetail.url);
    };

    const content = (
        <DetailPaper
            url={props.config.url || props.url}
            urlBase={props.config.baseURL}
            detailConfig={props.config.summaryConfig}
            selectedKey={summaryDetail.id}
        />);

    let table = (
        <CustomTable
            onRowClick={openSummaryHandler}
            onRowDoubleClick={props.onItemOpen}
        />
    );
    if (props.isRestful) {
        table = (
            <RestfulTable
                tableConfig={props.config.tableConfig}
                onDetailButtonClick={openSummaryHandler}
                onItemOpen={openItemHandler}
                url={props.config.url || props.url}
                urlBase={props.config.baseURL}
                urlParams={props.config.params || ""}
            />
        );
    }

    return (
        <div>
            <ObjectSummary
                open={summaryOpen}
                onSummaryClose={closeSummaryHandler}
                content={content}
                url={resolveUrl()}
                selectedKey={summaryDetail.id}
                onAddItemClick={openItemHandler}
                onEditItemClick={openItemHandler}
                onDeleteItemClick={deleteButtonHandler}
            >
                {/* Must nest in order to adjust size as object summary opens. */}
                <div className={classes.summaryTable}>
                    {table}
                </div>
            </ObjectSummary>
        </div>
    );
};

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenItem: (key, url) => dispatch(objectManagerActions.openItemInObjectManager(key, url)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryTable));