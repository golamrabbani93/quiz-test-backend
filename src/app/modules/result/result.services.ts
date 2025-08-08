import { IResult } from './result.interface'
import { Result } from './result.model'

//create result
const createResultIntoDB = async (id: string, payload: IResult) => {
  console.log('🚀🚀 ~ createResultIntoDB ~ id:', id)
  const result = await Result.create({ ...payload, user: id })
  return result
}

export const resultServices = {
  createResultIntoDB,
}
