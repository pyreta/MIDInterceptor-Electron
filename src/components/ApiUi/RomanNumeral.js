import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 19px;
  font-family: times;
  font-weight: bold;
  display: flex;
`;

const FiguredBass = styled.div`
  font-size: 11px;
  padding-left: 2px;
`;

const Num = styled.div`
  height: 9px
`;

const RomanNumeral = ({
  numeral,
  figuredBass,
  quality,
  invertedQuality
}) => (
    <Wrapper>
      { numeral }
      { figuredBass.length ? invertedQuality : quality }
      <FiguredBass>
        { figuredBass.map(i => <Num key={i}>{i}</Num>) }
      </FiguredBass>
    </Wrapper>
  )

export default RomanNumeral
