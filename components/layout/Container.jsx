import Background from './Background';
import { ThemeProvider } from 'styled-components';
import { RootApp, theme } from "../design/theme";

export default function Container(props) {
    return (
        <main>
            <Background blur={props.blur} />
            <ThemeProvider theme={theme}>
                <RootApp center={props.center}>
                    {props.children}
                </RootApp>
            </ThemeProvider>
        </main>
    )
}