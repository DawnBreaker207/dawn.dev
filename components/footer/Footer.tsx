import BuildWith from './BuildWith'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 mb-8 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuildWith />

        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>Dawn Blog</span>
        </div>
      </div>
    </footer>
  )
}
