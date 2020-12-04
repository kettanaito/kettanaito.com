import Image from 'gatsby-image'
import styled from 'styled-components'

export const Thumbnail = styled(Image)`
  --shadow-offset: 0px;

  display: flex;
  height: auto;
  max-width: 100%;
  border-radius: var(--border-radius);
  box-shadow: 0 3.3px calc(4px + var(--shadow-offset)) rgba(0, 0, 0, 0.02),
    0 calc(11.2px + var(--shadow-offset)) 13.4px rgba(0, 0, 0, 0.03),
    0 calc(50px + var(--shadow-offset)) 60px rgba(0, 0, 0, 0.05);
`
