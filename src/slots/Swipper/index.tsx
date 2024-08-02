import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// const swiperData = [
//   {
//     title: 'LOL 世界赛晋级预测',
//     subtitle: 'LogicFLow 晋级流程图',
//     desc: '一位热心的LOL玩家利用LogicFlow创建了详细的晋级流程图，并分享了自己对今年小组赛的预测。尽管在最近的比赛中感到沮丧，他依然对京东战队充满信心。该图表展示了各支战队的晋级路径和可能结果，为LOL爱好者提供了一个有趣的讨论点。',
//     img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/examples/case/bussiness/games.png',
//     alt: '比赛晋级图',
//   },
//   {
//     title: '零代码逻辑编排',
//     subtitle: '零代码应用',
//     desc: '在滴滴客服业务里，通过零代码的方式来配置页面已经有丰富的落地经验，大大的提高了服务用户的效率和质量。但是传统零代码在页面逻辑配置上表现并不好，很难做到灵活扩展。因此，滴滴客服技术团队探索出一种新的思路，用流程编排的方式来编排页面的逻辑，解决零代码的难扩展问题。',
//     img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/examples/case/bussiness/organizer.png',
//     alt: '低代码编排器',
//   },
//   {
//     title: '企业级问卷系统 - XIAOJUSURVEY',
//     subtitle: '图形化跳转逻辑应用',
//     desc: 'XIAOJUSURVEY是滴滴开源的企业级问卷系统，提供全面、专业和安全的在线调研解决方案。通过集成 LogicFlow 实现了复杂的问卷跳转逻辑，支持市场调研、客户满意度调查和在线考试等多场景应用。通过图形化编排能够直观地创建和维护复杂的问卷流程，轻松实现多条件分支、循环、条件跳转等复杂逻辑，进而提升了系统的灵活性和客户体验。',
//     img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/xiaojukeji1.png',
//     alt: '小桔问卷',
//   },
// ];

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
import { Autoplay, Parallax, Pagination, Navigation } from 'swiper/modules';
import { Button, Card, Col, Row } from 'antd';
import { map } from 'lodash-es';

export function CustomSlider() {
  const [swiperData, setSwiperData] = useState<SwiperItemProps[]>([]);

  // const progressCircle = useRef(null);
  // const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };

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
          <p
            className=""
            style={{
              letterSpacing: '0.025rem',
              lineHeight: 1.625,
              fontWeight: 700,
              fontSize: '1rem',
              marginBottom: '.5rem',
              color: '#3f7ef8',
            }}
          >
            真实案例
          </p>
          <h1
            style={{
              fontSize: '3rem',
              lineHeight: 1,
              letterSpacing: 0,
              fontWeight: 900,
              marginBottom: '1rem',
            }}
          >
            已赢得千余用户的信赖
          </h1>
        </Col>
        <Col span={10} offset={4}>
          <p
            style={{
              lineHeight: 1.625,
              fontSize: '1rem',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            从个人开源开发者，到滴滴、美团这样量级的公司，我们已经看到 LogicFlow
            被应用于低代码页面逻辑编排、问卷跳转逻辑配置、比赛结果预测娱乐应用以及机器学习数据处理流程等各种场景。
          </p>
          <Button href="/examples">查看更多案例</Button>
        </Col>
      </Row>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Autoplay, Parallax, Pagination, Navigation]}
        className="mySwiper"
        spaceBetween={30}
        centeredSlides={true}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
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
        {map(swiperData, (data) => {
          return (
            <SwiperSlide key={data.title}>
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
          );
        })}
        {/* <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="16"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div> */}
      </Swiper>
    </Card>
  );
}
