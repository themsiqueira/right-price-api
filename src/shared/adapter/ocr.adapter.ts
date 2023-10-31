import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class OcrAdapter {
  private readonly logger = new Logger()
  constructor(private readonly httpService: HttpService) {}

  async uploadFile(file: Blob): Promise<{ container_name: string; blob_name: string }> {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://your-ocr-api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      )
      const { container_name, blob_name } = <{ container_name: string; blob_name: string }>response.data
      return { container_name, blob_name }
    } catch (error: unknown) {
      // Handle error
      this.logger.error(error)
      throw new Error('File upload failed')
    }
  }

  async getPromotions(container_name: string, blob_name: string): Promise<{ name: string; price: number }[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://your-ocr-api/promotions', {
          params: { container_name, blob_name }
        })
      )

      const { data } = <{ data: { name: string; price: number }[] }>response.data
      return data as { name: string; price: number }[]
    } catch (error: unknown) {
      this.logger.error(error)
      throw new Error('Failed to fetch promotions')
    }
  }
}
