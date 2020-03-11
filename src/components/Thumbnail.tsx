import Image from 'gatsby-image'
import styled from 'styled-components'

export const Thumbnail = styled(Image)`
  display: flex;
  height: auto;
  max-width: 100%;
  border-radius: 3px;
  box-shadow: 0 3.3px 4px rgba(0, 0, 0, 0.02),
    0 11.2px 13.4px rgba(0, 0, 0, 0.03), 0 50px 60px rgba(0, 0, 0, 0.05);
`
