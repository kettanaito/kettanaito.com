import styled from 'styled-components'

const Quote = styled.blockquote`
  position: relative;
  border: 0;
  margin: 3rem 0 4rem 2rem;
  color: ${({ theme }) => theme.colors.grayDark};
  font-family: 'Playfair Display', Charter, 'Bookman Antiqua', Georgia, serif;
  font-size: 1.4rem;
  font-weight: bold;
  font-style: italic;
  line-height: 1.75;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 1rem;
    margin-right: 2rem;
  }
`

export default Quote
