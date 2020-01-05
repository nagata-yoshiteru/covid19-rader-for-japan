import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { userActions } from "../../../../redux/saga/user";
import { useDispatch, useSelector } from "react-redux";
import {
    LoadingState,
    User,
    Notification as NotificationType
} from "../../../../types";
import { useLoading } from "../../../../common/hooks/useLoading";
import { withRouter, match } from "react-router";
import * as H from "history";
import { AppState } from "../../../../redux/module";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const NotificationContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleUpdateNotification = (values: FormikValues) => {
        const notification = values.notification;
        user.Setting.Notification = notification;
        dispatch(userActions.updateUserAction({ user: user,
			loadingStatus: LoadingState.UPDATE_NOTIFICATION }));
    };

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
            //history.push("/home");
        }
    };

    useLoading(LoadingState.UPDATE_NOTIFICATION, callback);

    const user: User = useSelector((state: AppState) => state.User);
    let notification: NotificationType = user.Setting.Notification;

    return (
        <Notification
            handleUpdateNotification={handleUpdateNotification}
            notification={notification}
        />
    );
};

export default withRouter(NotificationContainer);

// Presentational
interface Props {
    handleUpdateNotification: (values: FormikValues) => void;
    notification: NotificationType;
}

export const Notification: React.FC<Props> = props => {
    const { handleUpdateNotification, notification } = props;

    const classes = useStyles();

    return (
        <Card>
            <Formik
                initialValues={{
                    notification: notification
                }}
                onSubmit={values => handleUpdateNotification(values)}
                validationSchema={Yup.object().shape({})}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <div>
                        <CardHeader
                            subheader="Manage the notifications"
                            title="Notifications"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={6} wrap="wrap">
                                <Grid
                                    className={classes.item}
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                >
                                    <Typography gutterBottom variant="h6">
                                        Notifications
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.notification.Email ||
                                                    false
                                                }
                                                onChange={() => {
                                                    values.notification.Email = !values
                                                        .notification.Email;
                                                    setFieldValue(
                                                        "notification",
                                                        values.notification
                                                    );
                                                }}
                                            />
                                        }
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.notification.Push ||
                                                    false
                                                }
                                                onChange={() => {
                                                    values.notification.Push = !values
                                                        .notification.Push;
                                                    setFieldValue(
                                                        "notification",
                                                        values.notification
                                                    );
                                                }}
                                            />
                                        }
                                        label="Push Notifications"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => handleSubmit()}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));
