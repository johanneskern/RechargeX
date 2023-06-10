import React, { SVGProps } from "react";
import { ReactComponent as StepName } from "./list/step-name.svg";
import { ReactComponent as StepPublish } from "./list/step-publish.svg";
import { ReactComponent as StepTrigger } from "./list/step-trigger.svg";
import { ReactComponent as StepWorkflow } from "./list/step-workflow.svg";
import { ReactComponent as Check } from "./list/check.svg";
import { ReactComponent as Gnosis } from "./list/gnosis.svg";
import { ReactComponent as NavContract } from "./list/nav-contract.svg";
import { ReactComponent as NavDocs } from "./list/nav-docs.svg";
import { ReactComponent as NavSdk } from "./list/nav-sdk.svg";
import { ReactComponent as NavSettings } from "./list/nav-settings.svg";
import { ReactComponent as NavWorkflows } from "./list/nav-workflows.svg";
import { ReactComponent as NavBalance } from "./list/balance.svg";
import { ReactComponent as Star } from "./list/star.svg";
import { ReactComponent as Wallet } from "./list/wallet.svg";
import { ReactComponent as NodeTrigger } from "./list/node-trigger.svg";
import { ReactComponent as NodeAction } from "./list/node-action.svg";
import { ReactComponent as NodeCondition } from "./list/node-condition.svg";
import { ReactComponent as NodeExit } from "./list/node-exit.svg";
import { ReactComponent as NodePlaceholder } from "./list/node-placeholder.svg";
import { ReactComponent as Add } from "./list/add.svg";
import { ReactComponent as ArrowBack } from "./list/arrow-back.svg";
import { ReactComponent as Pause } from "./list/pause.svg";
import { ReactComponent as PauseWhite } from "./list/pause-white.svg";
import { ReactComponent as Play } from "./list/play.svg";
import { ReactComponent as PlayWhite } from "./list/play-white.svg";
import { ReactComponent as PopupConfirm } from "./list/popup-confirm.svg";
import { ReactComponent as PopupCancel } from "./list/popup-cancel.svg";
import { ReactComponent as PopupPaused } from "./list/popup-paused.svg";
import { ReactComponent as Polygon } from "./list/polygon.svg";
import { ReactComponent as Ethereum } from "./list/ethereum.svg";
import { ReactComponent as BSC } from "./list/bsc.svg";
import { ReactComponent as Menu } from "./list/menu.svg";
import { ReactComponent as Done } from "./list/done.svg";
import { ReactComponent as MetaMask } from "./list/metamask.svg";
import { ReactComponent as ChainComplete } from "./list/chain-complete.svg";
import { ReactComponent as ChainError } from "./list/chain-error.svg";
import { ReactComponent as ChainLoader } from "./list/chain-loader.svg";
import { ReactComponent as ChainErrorWithoutAnimation } from "./list/chain-error-without-animation.svg";
import { ReactComponent as ChainCompleteWithoutAnimation } from "./list/chain-complete-without-animation.svg";
import { ReactComponent as BalanceGraph } from "./list/balance-graph.svg";
import { ReactComponent as Trash } from "./list/trash.svg";
import { ReactComponent as Shape } from "./list/shape.svg";
import { ReactComponent as Dagger } from "./list/close.svg";
import { ReactComponent as Plus } from "./list/plus.svg";
import { ReactComponent as Logout } from "./list/logout.svg";
import { ReactComponent as Linea } from "./list/linea.svg";
import { ReactComponent as Executions } from "./list/executions.svg";
import { ReactComponent as Duplicate } from "./list/duplicate.svg";
import { ReactComponent as Cancel } from "./list/cancel.svg";
import { ReactComponent as ArrowBase } from "./list/arrow-base.svg";
import { ReactComponent as Edit } from "./list/edit.svg";
import { ReactComponent as Info } from "./list/info.svg";
import { ReactComponent as ChainBalance } from "./list/chain-balance.svg";
import { ReactComponent as ChainBalanceActive } from "./list/chain-balance-active.svg";
import { ReactComponent as Load } from "./list/load.svg";
import { ReactComponent as Loading } from "./list/loading.svg";
import { ReactComponent as LinkedIn } from "./list/linkedin.svg";
import { ReactComponent as Medium } from "./list/medium.svg";
import { ReactComponent as Twitter } from "./list/twitter.svg";

export type Icon = React.FC<SVGProps<SVGSVGElement>>;

export const icons = {
	Shape,
	StepName,
	StepPublish,
	StepTrigger,
	StepWorkflow,
	Cancel,
	Check,
	ChainBalance,
	ChainBalanceActive,
	ChainComplete,
	ChainError,
	ChainLoader,
	ChainErrorWithoutAnimation,
	ChainCompleteWithoutAnimation,
	Gnosis,
	NavContract,
	NavDocs,
	NavSdk,
	NavSettings,
	NavWorkflows,
	NavBalance,
	Star,
	Wallet,
	MetaMask,
	NodeTrigger,
	NodeAction,
	NodeCondition,
	NodeExit,
	NodePlaceholder,
	Medium,
	Add,
	ArrowBack,
	ArrowBase,
	BalanceGraph,
	BSC,
	Pause,
	Play,
	PlayWhite,
	PopupConfirm,
	Plus,
	Menu,
	PauseWhite,
	Polygon,
	Ethereum,
	Executions,
	Edit,
	Dagger,
	Done,
	Duplicate,
	PopupCancel,
	PopupPaused,
	Trash,
	Twitter,
	Load,
	Loading,
	Logout,
	Linea,
	LinkedIn,
	Info,
};
