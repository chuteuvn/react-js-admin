import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit';
import CreateIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';

let id = 0;

function createData(brankId, accountHolder, accountNumber, bankName, bankBranchName) {
    id += 1;
    return { id, brankId, accountHolder, accountNumber, bankName, bankBranchName };
}

class ListBanksAccount extends Component {
    state = {
        selectedIds: [],
        rows: [
            createData(1, 'Chu Tự Hoàng', 17891234587921, "Vietcombank", "PGD QUANG TRUNG, Hà Nội"),
            createData(2, 'Tưởng Là Tuấn', 17891234587921, "Vietcombank", "PGD HÀNG KHOAI, Hà Nội"),
            createData(3, 'Phạm Đức Trực', 17891234587921, "Vietcombank", "PGD HÀNG KHOAI, Hà Nội"),
            createData(4, 'Lê Văn Cường', 17891234587921, "Vietcombank", "PGD HÀNG KHOAI, Hà Nội"),
            createData(5, 'Nguyễn Văn Đạt', 17891234587921, "Vietcombank", "PGD HÀNG KHOAI, Hà Nội"),
        ]
    }

    selectAll() {
        if (this.state.selectedIds.length == this.state.rows.length) {
            this.setState({
                selectedIds: []
            });
        } else {
            const selectedIds = this.state.rows.map(i => i.id);
            this.setState({
                selectedIds
            });
        }
    }

    select(item) {
        if (this.state.selectedIds.indexOf(item.id) === -1) {
            const selectedIds = [
                ...this.state.selectedIds,
                item.id
            ]
            this.setState({
                selectedIds
            });
        } else {
            const selectedIds = this.state.selectedIds.filter(i => i != item.id);
            this.setState({
                selectedIds
            });
        }
    }

    itemClick(item) {

    }

    render() {
        const { classes, theme } = this.props;
        const rows = this.state.rows
        return (
            <Paper style={styles.root}>
                <Toolbar className={classes.toolbar}>
                    <span>
                        <Tooltip title="Thêm mới">
                            <Button variant="contained" size="small" >
                                <CreateIcon color="primary" />
                                Thêm mới
                            </Button>
                        </Tooltip>
                        {
                            this.state.selectedIds.length ? (
                                <Tooltip title="Xóa người dùng">
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                            ) : null
                        }
                    </span>
                    <div style={{ flexGrow: 1 }}></div>
                    <Tooltip title="Lọc danh sách">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon color="default" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox checked={rows.length == this.state.selectedIds.length} onClick={this.selectAll.bind(this)} />
                            </TableCell>
                            <TableCell >ID</TableCell>
                            <TableCell numeric>Chủ sở hữu</TableCell>
                            <TableCell numeric>Số tài khoản</TableCell>
                            <TableCell numeric>Tên ngân hàng</TableCell>
                            <TableCell numeric>Chi nhánh</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            const selected = this.state.selectedIds.some(i => i === row.id);
                            return (
                                <TableRow
                                    hover
                                    selected={selected}
                                    key={row.id}
                                    onClick={this.itemClick.bind(this, row)}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selected} onClick={this.select.bind(this, row)} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.brankId}
                                    </TableCell>
                                    <TableCell numeric>{row.accountHolder}</TableCell>
                                    <TableCell numeric>{row.accountNumber}</TableCell>
                                    <TableCell numeric>{row.bankName}</TableCell>
                                    <TableCell numeric>{row.bankBranchName}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}

ListBanksAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    actions: {
        display: 'flex',
        width: '100%'
    },
    toolbar: {
        paddingLeft: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit
    }
    // highlight:
    //     theme.palette.type === 'light'
    //         ? {
    //             color: theme.palette.secondary.main,
    //             backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //         }
    //         : {
    //             color: theme.palette.text.primary,
    //             backgroundColor: theme.palette.secondary.dark,
    //         },
});

export default withStyles(styles)(ListBanksAccount);
