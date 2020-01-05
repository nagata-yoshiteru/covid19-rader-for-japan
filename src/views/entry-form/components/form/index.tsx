import React, { useState, useEffect, useCallback } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { Item, MarketType, Image, ImageStatus } from "../../../../types";
import Dropzone from "react-dropzone";
import uuid from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        marginTop: theme.spacing(2)
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    signInButton: {
        margin: theme.spacing(2, 0)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

interface Props {
    item: Item;
    handleRegistItem: (values: FormikValues) => void;
}

const validationSchema = {};

const Form: React.FC<Props> = props => {
    const { item, handleRegistItem } = props;

    const classes = useStyles();

    const initialValues = {
        ID: item.ID,
        MarketType: item.MarketType,
        StartDate: item.StartDate,
        EndDate: item.EndDate,
        TradeType: item.TradeType,
        Pair: item.Pair,
        Lot: item.Lot,
        EntryRate: item.EntryRate,
        LossCutRate: item.LossCutRate,
        SettleRate: item.SettleRate,
        Profit: item.Profit,
        BeforeComment: item.BeforeComment,
        AfterComment: item.AfterComment,
        Tags: item.Tags,
        Images: item.Images,
        UpdatedAt: item.UpdatedAt,
        CreatedAt: item.CreatedAt
    };

    useEffect(() => {
        console.log("initial", initialValues);
    });

    console.log("render");

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={values => handleRegistItem(values)}
            validationSchema={Yup.object().shape(validationSchema)}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                handleBlur,
                setFieldValue
            }) => (
                <div className={classes.form}>
                    <Typography variant={"h3"}>取引登録画面</Typography>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            MarketType
                        </InputLabel>
                        <Select
                            id="demo-simple-select-outlined"
                            value={values.MarketType}
                            onChange={handleChange("MarketType")}
                            labelWidth={100}
                        >
                            <MenuItem value={0}>FX</MenuItem>
                            <MenuItem value={1}>STOCK</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="StartDate"
                        name="StartDate"
                        onChange={handleChange("StartDate")}
                        type="text"
                        value={values.StartDate}
                        variant="outlined"
                        onBlur={handleBlur("StartDate")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="EndDate"
                        name="EndDate"
                        onChange={handleChange("EndDate")}
                        type="text"
                        value={values.EndDate}
                        variant="outlined"
                        onBlur={handleBlur("EndDate")}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            TradeType
                        </InputLabel>
                        <Select
                            id="demo-simple-select-outlined"
                            value={values.TradeType}
                            onChange={handleChange("TradeType")}
                            labelWidth={100}
                        >
                            <MenuItem value={0}>Buy</MenuItem>
                            <MenuItem value={1}>Sell</MenuItem>
                            <MenuItem value={2}>Record</MenuItem>
                            <MenuItem value={3}>Withdrawal</MenuItem>
                            <MenuItem value={4}>Deposit</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Pair
                        </InputLabel>
                        <Select
                            id="demo-simple-select-outlined"
                            value={values.Pair}
                            onChange={handleChange("Pair")}
                            labelWidth={100}
                        >
                            <MenuItem value={values.Pair}>
                                <em>{values.Pair}</em>
                            </MenuItem>
                            <MenuItem value={"GBP/USD"}>GBP/USD</MenuItem>
                            <MenuItem value={"USD/JPY"}>USD/JPY</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="Lot"
                        name="Lot"
                        onChange={handleChange("Lot")}
                        type="text"
                        value={values.Lot}
                        variant="outlined"
                        onBlur={handleBlur("Lot")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="Order"
                        name="Order"
                        onChange={handleChange("EntryRate")}
                        type="text"
                        value={values.EntryRate}
                        variant="outlined"
                        onBlur={handleBlur("EntryRate")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="LossCut"
                        name="LossCut"
                        onChange={handleChange("LossCutRate")}
                        type="text"
                        value={values.LossCutRate}
                        variant="outlined"
                        onBlur={handleBlur("LossCutRate")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="Settle"
                        name="Settle"
                        onChange={handleChange("SettleRate")}
                        type="text"
                        value={values.SettleRate}
                        variant="outlined"
                        onBlur={handleBlur("SettleRate")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="Profit"
                        name="Profit"
                        onChange={handleChange("Profit")}
                        type="text"
                        value={values.Profit}
                        variant="outlined"
                        onBlur={handleBlur("Profit")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="BeforeMemo"
                        name="BeforeMemo"
                        onChange={handleChange("BeforeComment")}
                        type="text"
                        value={values.BeforeComment}
                        variant="outlined"
                        onBlur={handleBlur("BeforeComment")}
                    />
                    <TextField
                        className={classes.textField}
                        //error={errors.email && touched.email ? true : false}
                        fullWidth
                        /*helperText={
                            errors.email && touched.email ? errors.email : null
                        }*/
                        label="AfterMemo"
                        name="AfterMemo"
                        onChange={handleChange("AfterComment")}
                        type="text"
                        value={values.AfterComment}
                        variant="outlined"
                        onBlur={handleBlur("AfterComment")}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">
                            Tags
                        </InputLabel>
                        <Select
                            id="demo-simple-select-outlined"
                            value={"20"}
                            onChange={handleChange}
                            labelWidth={100}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <Dropzone
                        onDrop={(acceptedFiles: File[]) => {
                            const fileData = acceptedFiles[0];
                            var reader = new FileReader();
                            // ファイル読み込みに成功したときの処理
                            reader.onload = function() {
                                const url = reader.result;
                                if (
                                    !(url instanceof ArrayBuffer) &&
                                    url !== null
                                ) {
                                    let imgs = values.Images.concat();
                                    imgs.push({
                                        id: uuid(),
                                        url: url,
                                        size: fileData.size,
                                        status: ImageStatus.UPDATE
                                    });
                                    setFieldValue("Images", imgs);
                                }
                            };
                            // ファイル読み込みを実行
                            reader.readAsDataURL(fileData);
                        }}
                        accept="image/jpeg,image/png,image/jpg"
                    >
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Button variant="contained">Upload</Button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <div style={{ height: 300, width: "100%" }}>
                        <Typography>preview</Typography>
                        {values.Images.map((image, index) => {
                            if (image.status !== ImageStatus.DELETE) {
                                return (
                                    <li
                                        key={index}
                                        style={{
                                            display: "inline-block",
                                            listStyleType: "none",
                                            width: "200px",
                                            objectFit: "fill",
                                            marginRight: "10px",
                                            position: "relative"
                                        }}
                                    >
                                        <img
                                            src={image.url}
                                            width={200}
                                            height={200}
                                        />

                                        <div
                                            style={{
                                                position: "absolute",
                                                backgroundColor: "#fff",
                                                border: "solid 1px #000",
                                                top: 0,
                                                right: 0,
                                                padding: "5px",
                                                opacity: 0.5,
                                                cursor: "pointer"
                                            }}
                                            onClick={e => {
                                                let imgs = values.Images.concat();
                                                if (
                                                    imgs[index].status ===
                                                    ImageStatus.UPDATE
                                                ) {
                                                    // Updateのままだったら単純に削除する
                                                    imgs.splice(index, 1);
                                                } else if (
                                                    imgs[index].status ===
                                                    ImageStatus.NONE
                                                ) {
                                                    // すでにFirestoreに保存されている画像の場合、削除のためDELETEにする
                                                    imgs[index].status =
                                                        ImageStatus.DELETE;
                                                }
                                                setFieldValue("Images", imgs);
                                            }}
                                        >
                                            Cancel
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </div>

                    <Button
                        className={classes.signInButton}
                        color="primary"
                        disabled={false}
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => handleSubmit()}
                    >
                        Regist
                    </Button>
                </div>
            )}
        </Formik>
    );
};

export default Form;
