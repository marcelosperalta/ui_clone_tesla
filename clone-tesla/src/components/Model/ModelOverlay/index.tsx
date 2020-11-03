import React, { useLayoutEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

import { CarModel } from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll';

import { Container } from './styles';

interface Props {
  model: CarModel
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>

const ModelOverlay: React.FC<Props> = ({ model, children }) => {
  const { scrollY } = useWrapperScroll()

  // console.log(model.sectionRef)

  const getSectionDimensions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight
    } as SectionDimensions
  }, [])

  const [dimensions, setDimensions] = useState<SectionDimensions>(
    getSectionDimensions()
  )

  useLayoutEffect(() => {
    function onResize() {
      // const data = getSectionDimensions()
      // console.log(data)
      // window.requestAnimationFrame(() => setDimensions(data))
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()))
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [getSectionDimensions])

  return <Container>{children}</Container>
};

export default ModelOverlay;
