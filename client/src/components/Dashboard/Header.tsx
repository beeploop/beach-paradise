import { Flex, Image } from '@mantine/core'

function Header() {
    return (
        <div
            style={{
                border: '1px solid',
                borderRadius: '.5em',
                padding: '.5em',
                textAlign: 'center',
                overflow: 'hidden',
            }}
        >
            <h2>Welcome Back Admin!</h2>
            <Image
                src="/admin.svg"
                width={300}
                style={{
                    scale: '1.6',
                }}
            />
        </div>
    )
}

export default Header
