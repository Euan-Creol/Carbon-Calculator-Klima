import { createMuiTheme } from '@material-ui/core/styles'
import { getStyles }      from 'core/libs/lib-style-helpers'

const colors = getStyles([
  'error',
  'primary',
  'secondary'
])
const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    error: {
      main: colors.error
    },
    textPrimary: {
      main: colors.primary
    },
    textSecondary: {
      main: colors.secondary
    },
    action: {
      disabled: '#5f4b8b',
      disabledBackground: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true,
    body2: {
      fontFamily: 'inherit',
      fontSize: '14px',
      color: colors.primary,
      whiteSpace: 'pre-line'
    },
    h2: {
      fontFamily: 'inherit',
      fontSize: '32px',
      color: 'colors.primary'
    },
    h5: {
      fontFamily: 'inherit'
    }

  }
})

export default theme
