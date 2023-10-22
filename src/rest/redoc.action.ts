import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Documentation')
@Controller('docs')
export class DocsRedocAction {
  @Get('redoc')
  @ApiOperation({
    operationId: 'RedocDocs',
    description: 'Display the Swagger Api Document in the Redoc format'
  })
  getRedoc(): string {
    const theme = {
      colors: {
        primary: {
          main: '#3f20BA',
          light: '#6c51d7'
        },
        success: {
          main: '#1cb841',
          light: '#81ec9a',
          dark: '#083312',
          contrastText: '#000'
        },
        text: {
          primary: '#303030',
          secondary: '#70708E'
        },
        http: {
          get: '#5fa6fc',
          post: '#5dc187',
          put: '#f39930',
          delete: '#e94436'
        }
      },
      typography: {
        fontSize: '14px',
        fontFamily: 'Source Sans Pro,sans-serif',
        smoothing: 'antialiased',
        headings: {
          fontWeight: 'bold',
          lineHeight: '1em'
        },
        code: {
          fontWeight: '400',
          color: '#6c51d7',
          wrap: true
        },
        links: {
          color: '#3f20BA',
          visited: '#3f20BA',
          hover: '#6c51d7'
        }
      },
      components: {
        tryItButton: {
          fullWidth: 'true'
        }
      },
      sidebar: {
        backgroundColor: '#EEEEF2',
        width: '15%',
        textColor: '#404060'
      },
      rightPanel: {
        backgroundColor: '#504E68',
        textColor: '#DDDDDD',
        width: '35%'
      },
      shape: { borderRadius: '18px' },
      logo: { maxWidth: '100%', maxHeight: '20%', gutter: '10px' }
    }

    const doc = `<!DOCTYPE html>
    <html>
      <head>
        <title>Payment API - Redoc</title>
        <!-- needed for adaptive design -->
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    
        <!--
        Redoc doesn't change outer page styles
        -->
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc theme='${JSON.stringify(theme)}' spec-url='/docs-json'></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"> </script>
      </body>
    </html>`
    return doc
  }
}
