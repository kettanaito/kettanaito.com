import styled from 'styled-components'

interface AvatarProps {
  size?: number
}

export const Avatar = styled.img<AvatarProps>`
  display: flex;
  margin: 0;
  border-radius: 50%;
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`

Avatar.defaultProps = {
  size: 60,
}
