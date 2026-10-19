// /careers/jobs/<id>/ (legacy Gatsby job posting). Fed by the placeholder openings in components/pages/careers/data.js.
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../../components/shared/index.js'
import { JobDetail } from '../../../components/pages/careers/JobDetail.jsx'
import { JOBS } from '../../../components/pages/careers/data.js'

export const theme = 'enterprise'

export default function CareersJob() {
  const { id } = useParams()
  const job = JOBS.find((j) => j.id === id)
  // title is per posting, like live ("<role> | Careers at Tines"); NotFoundPage sets its own
  useEffect(() => {
    if (job) document.title = `${job.role} | Careers at Tines`
  }, [job])
  if (!job) return <NotFoundPage actions={[{ href: '/careers/', label: 'All open positions' }]} />
  return <JobDetail job={job} />
}
