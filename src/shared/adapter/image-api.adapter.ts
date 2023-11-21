import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'
import { CreateProductInput } from '@app/product/input/create-product.input'
import { firstValueFrom } from 'rxjs'

const unsplash = createApi({
  accessKey: 'UNSPLASH_ACCESS_KEY',
  fetch: nodeFetch
})

@Injectable()
export class ImageAPIAdapater {
  private readonly logger = new Logger()
  constructor(private readonly httpService: HttpService) {}

  async getImage(input: CreateProductInput): Promise<{ container_name: string; blob_name: string }> {
    const apiKey = process.env.UNSPLASH_ACCESS_KEY

    try {
      const url = `https://api.unsplash.com/search/photos?query=${input}&client_id=${apiKey}`
      console.log(url)
      const response = await firstValueFrom(
        this.httpService.post('https://api.unsplash.com/search/photos?query={query}&client_id={access_key}', {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      )
      console.log(response)
      const { container_name, blob_name } = <{ container_name: string; blob_name: string }>response.data
      return { container_name, blob_name }
    } catch (error: unknown) {
      // Handle error
      this.logger.error(error)
      throw new Error('Image download failed')
    }
  }
}
