import { Container, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import classes from '../src/styles.module.css'
function Header() {

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';


  return (
    <>
      <Container fluid h={70} bg="hsl(0, 0%, 100%)" p={0} className={classes.headerContainer}>
        <div className={classes.headerStart}>
          <Title order={2} fw="bold">Where in the World?</Title>
          <ActionIcon
            // color={dark ? 'hsl(0, 0%, 98%)' : 'black'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
            c={dark ? 'hsl(0, 0%, 98%)' : 'black'}
            className={classes.buttonToggle}
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />} 
            <p>Dark Mode</p>
          </ActionIcon>
        </div>
      </Container>
    </>
  )
}

export default Header