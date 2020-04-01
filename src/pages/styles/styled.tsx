import styled from '@emotion/styled';
import { Link } from 'gatsby';

// export const Container = styled.div`
//   display: grid;
//   grid-template-areas:
//     'header header header header header'
//     'col1 col1 . col2 col2'
//     'col1 col1 . col2 col2'
//     'col1 col1 . col2 col2';

//   @media only screen and (max-width: 767px) {
//     grid-template-areas:
//       'header '
//       'col1'
//       'col2'
//   }
// `

export const PrevButton = styled.div`
  margin: 30px;
  font-size: 28px;
  line-height: 33px;
  position: relative;
`;


export const Rows = styled.div`
  @media only screen and (max-width: 768px) { 
    display: flex;
    color: white;
    flex-direction: column;
    margin-top: -20px;
  }

  @media only screen and (min-width: 768px) { 
    display: flex;
    flex-direction: column;
    color: white;
    margin-top: -70px;
  }

`
export const Row1 = styled.div`
  @media only screen and (max-width: 768px) { 
    display: flex;
    color: white;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: 'white';
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex: 1;
    align-items: top;
    justify-content: center;
    color: 'white';
  }
`
export const Row2 = styled.div`
  @media only screen and (max-width: 768px) { 
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: center;
    color: 'white';
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex: 1;
    align-items: top;
    justify-content: center;
    color: 'white';
    padding-right: 100px;
    padding-left: 100px;
  }
`

export const Col1 = styled.div`
  @media only screen and (max-width: 768px) { 
    width: 100%;
    color: 'white';
    text-align: center;
    align-items: center;
  }
  

  @media only screen and (min-width: 768px) {
    color: 'white';
    width: 50%;
    text-align: center;
    align-items: center;
    margin-top: 100px;
  }
`
export const Description = styled.div`
  @media only screen and (max-width: 768px) {
    background: rgb(0,0,0,0.1);
    padding: 20px;
    border-radius: 20px;
    margin: 40px;

    .content > div{
      font-size: 20px
    } 
  }

  @media only screen and (max-width: 400px) {
    background: rgb(0,0,0,0.1);
    padding: 20px;
    border-radius: 20px;
    margin: 40px;

    .content > div{
      font-size: 15px
    } 
  }

  @media only screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: rgb(0,0,0,0.1);
    padding: 20px;
    border-radius: 20px;

    .content > div{
      font-size: 25px
    }
  }
`

export const Col2 = styled.div`
  @media only screen and (max-width: 768px) { 
    width: 100%;
  }

  @media only screen and (min-width: 768px) {
    width: 50%
  }
`

export const Chapters = styled.div`
  padding: 25px;
`
export const ChapterHead = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ChaptersList = styled.div`
  @media only screen and (min-width: 450px) {
    max-height: 100%;
    margin: 10px;
    text-align: 'left';
    text-color: "white";

    > Link {
      fontSize: 25px;
    }
  }

  @media only screen and (max-width: 450px) {
    max-height: 100%;
    margin: 10px;
    text-align: 'left';
    text-color: "white";

    > Link {
      fontSize: 15px;
    }
  }
`