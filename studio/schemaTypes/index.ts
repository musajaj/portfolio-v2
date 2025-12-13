import { profileType } from './profile'
import { projectType } from './project'
import { articleType } from './article'
import { statType } from './stat'
import { reviewType } from './review'
import { serviceType } from './service' // 👈 استيراد

export const schemaTypes = [
  profileType, 
  projectType,
  articleType,
  statType,
  reviewType,
  serviceType // 👈 إضافة
]