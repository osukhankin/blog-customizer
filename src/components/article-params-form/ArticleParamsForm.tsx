import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	formState: ArticleStateType;
	onFontFamilyChange: (option: OptionType) => void;
	onFontSizeChange: (option: OptionType) => void;
	onFontColorChange: (option: OptionType) => void;
	onBackgroundColorChange: (option: OptionType) => void;
	onContentWidthChange: (option: OptionType) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onClose,
	formState,
	onFontFamilyChange,
	onFontSizeChange,
	onFontColorChange,
	onBackgroundColorChange,
	onContentWidthChange,
}: ArticleParamsFormProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleMouseDown = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleMouseDown);
		return () => document.removeEventListener('mousedown', handleMouseDown);
	}, [isOpen, onClose]);

	return (
		<div ref={wrapperRef}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onFontFamilyChange}
					/>
					<Select
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={onFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={onFontColorChange}
					/>
					<Separator />
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={onContentWidthChange}
					/>
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={onBackgroundColorChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
