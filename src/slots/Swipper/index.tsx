import React, { useEffect, useState, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// const swiperData = [{
//   title: 'LOL 世界赛晋级预测',
//   subtitle: 'Subtitle',
//   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.',
//   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/examples/case/bussiness/games.png',
//   alt: '比赛晋级图',
// }, {
//   title: '低代码逻辑编排',
//   subtitle: 'Subtitle',
//   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.',
//   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/examples/case/bussiness/organizer.png',
//   alt: '低代码编排器',
// }, {
//   title: '小桔问卷跳转逻辑配置',
//   subtitle: 'Subtitle',
//   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.',
//   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/examples/case/demo/beautification.png',
//   alt: '小桔问卷',
// }];

export interface SwiperItemProps {
  index?: number;
  title: string;
  subtitle?: string;
  desc: string;
  link?: string;
  img: string;
  alt?: string;
}

// import required modules
import { EffectCreative, Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import { Button, Card, Col, Row } from 'antd';
import { map } from 'lodash-es';

export function CustomSlider() {
  const [swiperData, setSwiperData] = useState<SwiperItemProps[]>([]);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    fetch(
      'https://my-json-server.typicode.com/Logic-Flow/logicflow-sites-data/swiperCases', // 生产环境
    )
      .then((res) => res.json())
      .then((data) => {
        setSwiperData(data);
      })
      .catch(() => {
        setSwiperData([]);
      });
  }, []);

  return (
    <Card>
      <Row style={{ padding: '3.5rem' }}>
        <Col span={10}>
          <p className="" style={{ letterSpacing: '0.025rem', lineHeight: 1.625, fontWeight: 700, fontSize: '1rem', marginBottom: '.5rem', color: '#3f7ef8' }}>真实案例</p>
          <h1 style={{ fontSize: '3rem', lineHeight: 1, letterSpacing: 0, fontWeight: 900, marginBottom: '1rem' }}>当前服务上千的用户</h1>
        </Col>
        <Col span={10} offset={4}>
          <p style={{ lineHeight: 1.625, fontSize: '1rem', marginBottom: '1rem', marginTop: '1rem' }}>从个人开源开发者，到滴滴、美团这样的公司。我们已经看到 LogicFlow 被应用于低代码页面逻辑编排、问卷跳转逻辑配置、比赛结果预测娱乐应用以及机器学习数据处理流程等各种场景。</p>
          <Button href='/examples'>查看更多案例</Button>
        </Col>
      </Row>
      <Swiper
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={true}
        modules={[Autoplay, Parallax, Pagination, Navigation]}
        className="mySwiper"

        spaceBetween={30}
        centeredSlides={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}

        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{ backgroundColor: '#1c1826' }}
          data-swiper-parallax="-23%"
        ></div>
        {
          map(swiperData, (data) => {
            return (
              <SwiperSlide>
                <div className="swiper-slide-wrapper">
                  <div>
                    <div className="title" data-swiper-parallax="-300">
                      {data.title}
                    </div>
                    <div className="subtitle" data-swiper-parallax="-200">
                      {data.subtitle}
                    </div>
                    <div className="text" data-swiper-parallax="-100">
                      <p>{data.desc}</p>
                    </div>
                  </div>
                  <img
                    style={{ height: '400px' }}
                    src={data.img}
                    alt={data.alt}
                  />
                </div>
              </SwiperSlide>
            )
          })
        }
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="16"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </Card>
  );
}
