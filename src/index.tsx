import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFontFamilyChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	const handleFontSizeChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	const handleFontColorChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontColor: option }));
	const handleBackgroundColorChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	const handleContentWidthChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, contentWidth: option }));

	const handleApply = () => setAppliedState(formState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={() => setIsSidebarOpen((prev) => !prev)}
				onClose={() => setIsSidebarOpen(false)}
				formState={formState}
				onFontFamilyChange={handleFontFamilyChange}
				onFontSizeChange={handleFontSizeChange}
				onFontColorChange={handleFontColorChange}
				onBackgroundColorChange={handleBackgroundColorChange}
				onContentWidthChange={handleContentWidthChange}
				onApply={handleApply}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
