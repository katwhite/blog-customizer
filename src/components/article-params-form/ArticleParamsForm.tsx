import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	params: typeof defaultArticleState;
	onSubmit: (newState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	params,
	onSubmit,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [newArticleState, setArticleState] = useState(params);
	const handleSubmit = (e: SyntheticEvent) => {
		onSubmit(newArticleState);
		e.preventDefault();
	};
	const handleReset = () => {
		setArticleState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const handleChange = (
		key: keyof typeof newArticleState,
		value: OptionType
	) => {
		setArticleState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
				}}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						options={fontFamilyOptions}
						selected={newArticleState.fontFamilyOption}
						onChange={(val) => {
							handleChange('fontFamilyOption', val);
						}}
						title='шрифт'></Select>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={newArticleState.fontSizeOption}
						onChange={(val) => {
							handleChange('fontSizeOption', val);
						}}
						title='размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						selected={newArticleState.fontColor}
						onChange={(val) => {
							handleChange('fontColor', val);
						}}
						title='цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						selected={newArticleState.backgroundColor}
						onChange={(val) => {
							handleChange('backgroundColor', val);
						}}
						title='цвет фона'></Select>
					<Select
						options={contentWidthArr}
						selected={newArticleState.contentWidth}
						onChange={(val) => {
							handleChange('contentWidth', val);
						}}
						title='ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
