//---------- BARREL FILE ----------//

import { AudienceUtil } from '@/lib/utils/_internals/audience'
import { ErrorUtil } from '@/lib/utils/_internals/error'
import { ProductUtil } from '@/lib/utils/_internals/product'
import { TagUtil } from '@/lib/utils/_internals/tag'

class Util {
  readonly error = new ErrorUtil()
  readonly product = new ProductUtil()
  readonly audience = new AudienceUtil()
  readonly tag = new TagUtil()
}

export const util = new Util() // use exemple: util.audience.audienceToLabel()
