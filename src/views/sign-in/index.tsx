import React, { useEffect, useRef } from "react";
import { withRouter, match } from "react-router-dom";
import { Grid, Hidden } from "@material-ui/core";
import ImageField from "./components/image-field";
import BackButton from "./components/back-button";
import SignInForm from "./components/sign-in-form";

import { LoadingState } from "../../types";
import * as H from "history";
import { useLoading } from "../../common/hooks/useLoading";
import { styled } from "@material-ui/core/styles";
import theme from "../../styles/theme";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignInContainer: React.FC<ContainerProps> = props => {
    const { history } = props;

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_IN);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignIn />;
};

export default withRouter(SignInContainer);

// Presentational
interface Props {}

const SignIn: React.FC<Props> = props => {
    return (
        <ContainerGrid container>
            <Hidden smDown>
                <ImageGrid item xl={5} lg={5} md={5}>
                    <ImageField />
                </ImageGrid>
            </Hidden>
            <FormGrid item xl={7} lg={7} md={7} sm={12} xs={12}>
                <BackButton />
                <SignInForm />
            </FormGrid>
        </ContainerGrid>
    );
};

const FormGrid = styled(Grid)({});

const ImageGrid = styled(Grid)({});

const ContainerGrid = styled(Grid)({});